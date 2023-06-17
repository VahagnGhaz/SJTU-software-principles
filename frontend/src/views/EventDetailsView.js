import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Avatar, List, Button, Input, message, Typography, Row, Col, Space, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { Spin } from 'antd';

let emailBody = "Dear [Participant's Name],\n\nThis is an automated message to confirm your registration for the upcoming [Event Name]. We are pleased to inform you that your registration has been successfully processed.\n\nEvent Details:\n\nEvent Name: [Event Name]\nDate: [Event Date]\nTime: [Event Time]\nLocation: [Event Location]\nTo access additional event details, including the agenda and any important information, please visit the following link: [Event Details Link]\n\nPlease make a note of the event details and ensure you arrive at least [Arrival Time] to facilitate a smooth check-in process.\n\nIf you have any questions or require further assistance, please feel free to reach out to the event organizers directly at [Contact Email/Phone Number]. They will be more than happy to assist you.\n\nThank you for registering for [Event Name]. We hope you enjoy the event and find it informative and engaging.\n\nBest regards,\n\nXingQiao platform";
let confirmation = "Confirmation - Joining Event: [Event Name]";

function EventDetailsView() {
  const [event, setEvent] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [reload, setReload] = useState(false); 

  const location = useLocation();
  const eventId = new URLSearchParams(location.search).get("id");
  const userId = localStorage.getItem('userId');
  const [isParticipant, setIsParticipant] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/events/${eventId}`)
      .then(response => {
        setEvent(response.data);
        setIsParticipant(response.data.participants.some(participant => String(participant.id) === String(userId)));
      })
      .catch(error => {
        console.log(error);
      });
  }, [eventId, reload]);

  const postComment = () => {
    axios.post(`http://localhost:8080/api/events/${eventId}/comments`, { text: newComment })
      .then(response => {
        setNewComment("");
        setReload(!reload); 
        message.success('Comment posted!');
      })
      .catch(error => {
        console.log(error);
        message.error('Failed to post comment.');
      });
  };

  const joinEvent = async () => {
    await axios.post(`http://localhost:8080/api/events/addUser/${eventId}/${userId}`)
      .then(response => {
        setEvent(response.data);
        setIsParticipant(response.data.participants.some(participant => String(participant.id) === String(userId)));
        
        message.success('You joined the event!');
      })
      .catch(error => {
        console.log(error);
        message.error('Failed to join the event.');
      });

      let participantName = localStorage.getItem('username');
      let eventName = event.eventTitle;
      let eventDate = event.eventDate;
      let eventTime = event.eventTime;
      let eventLocation = event.eventLocation;
      let eventDetailsLink = "http://localhost:3000/eventDetails?id=" + eventId;
      let arrivalTime = event.eventTime - 30;
      let contactEmailOrPhoneNumber = event.organizer.email;
      


      emailBody = emailBody.replace(/\[Participant's Name\]/g, participantName);
      emailBody = emailBody.replace(/\[Event Name\]/g, eventName);
      emailBody = emailBody.replace(/\[Event Date\]/g, eventDate);
      emailBody = emailBody.replace(/\[Event Time\]/g, eventTime);
      emailBody = emailBody.replace(/\[Event Location\]/g, eventLocation);
      emailBody = emailBody.replace(/\[Event Details Link\]/g, eventDetailsLink);
      emailBody = emailBody.replace(/\[Arrival Time\]/g, arrivalTime);
      emailBody = emailBody.replace(/\[Contact Email\/Phone Number\]/g, contactEmailOrPhoneNumber);
      confirmation = confirmation.replace(/\[Event Name\]/g, eventName);

      let body = {  receiver_email: localStorage.getItem('email'),
      subject: confirmation,
      body: emailBody
      }

      await axios.post(`http://127.0.0.1:5000/send_email`, body)

      console.log(body);

  };

  const leaveEvent = () => {
    axios.delete(`http://localhost:8080/api/events/removeUser/${eventId}/${userId}`)
      .then(response => {
        setEvent(response.data);
        setIsParticipant(response.data.participants.some(participant => String(participant.id) === String(userId)));
        message.success('You left the event!');
      })
      .catch(error => {
        console.log(error);
        message.error('Failed to leave the event.');
      });
  };

  if (!event) {
    return <Spin tip="Loading event details..." />;
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card cover={<img alt="event-gallery" src={event?.eventGallery} style={{ width: '100%', height: 'auto', maxHeight: '250px', objectFit: 'cover' }} />}></Card>
        </Col>
        <Col span={16}>
          <Card title={event.eventTitle}>
            <Typography.Paragraph>{event.eventDescription}</Typography.Paragraph>
            <Typography.Text strong>{event.eventDate} at {event.eventTime}</Typography.Text>
            <Typography.Paragraph>Location: {event.eventLocation}</Typography.Paragraph>
            <Typography.Paragraph>Organizer: <Link to={`/user/${event.organizer.username}`}>{event.organizer.username}</Link></Typography.Paragraph>
            <Space>
              <Button type="primary" onClick={joinEvent} disabled={isParticipant}>Join Event</Button>
              {isParticipant && <Button type="primary" danger onClick={leaveEvent}>Leave Event</Button>}
            </Space>
          </Card>
        </Col>
      </Row>
      
      <Divider>Participants</Divider>

      <List
        bordered
        dataSource={event.participants}
        renderItem={participant => (
          <List.Item>
            <Avatar icon={<UserOutlined />} />
            <Link to={`/user/${participant.username}`}>{participant.username}</Link>
          </List.Item>
        )}
      />

      <Divider>Leave a Comment</Divider>

      <Input.TextArea value={newComment} onChange={e => setNewComment(e.target.value)} style={{ marginBottom: '10px' }}/>
      <Button type="primary" onClick={postComment}>Post Comment</Button>

      <Divider>{event.comments.length} Replies</Divider>

      <List
        className="comment-list"
        itemLayout="horizontal"
        dataSource={event.comments}
        renderItem={comment => (
          <List.Item>
            <Card>
              <Card.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={<Link to={`/user/${comment.author.username}`}>{comment.author.username}</Link>}
                description={comment.text}
              />
              <Typography.Text type="secondary">{new Date(comment.dateTime).toLocaleString()}</Typography.Text>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default EventDetailsView;
