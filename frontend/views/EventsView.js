import React, { useEffect, useState } from 'react';
import { List, Avatar, Typography, Space } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/style.css'
const { Text } = Typography;

function EventsView() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from your backend API
    axios.get('http://localhost:8080/api/events') // replace this URL with your actual endpoint
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 3,
      }}
      dataSource={events}
      className="events-list"
      renderItem={event => (
        <List.Item
          key={event.id}
          extra={<img width={272} alt="logo" src={event.eventGallery} />}
        >
          <List.Item.Meta
            username={<Avatar src={UserOutlined} />}
            title={<Link to={{pathname: `/eventDetails`, search: '?id=' + event.id}}>{event.eventTitle}</Link>}
            description={
              <Space>
                <CalendarOutlined />
                <Text>{event.eventDate}</Text>
                <ClockCircleOutlined />
                <Text>{event.eventTime}</Text>
              </Space>
            }
          />
        <Text>Organized by: 
          <Link to={`/profile/${event.organizer.id}`}>{event.organizer.username}</Link></Text>
        </List.Item>
      )}
    />
  );
}

export default EventsView;
