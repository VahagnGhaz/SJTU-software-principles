import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, DatePicker, Select } from "antd";
import { ClipLoader } from 'react-spinners';

const { Option } = Select;

  function CreateEventView() {
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [form] = Form.useForm();

    const handleDescription = async () => {
      const values = form.getFieldsValue();
      let tags = '';
      if (values.tags) {
        tags = Array.isArray(values.tags) ? values.tags : values.tags.split(", ");
      }
  
      const data = {
        title: values.eventTitle,
        date: values.eventDate ? values.eventDate.format('YYYY-MM-DD') : "",
        time: values.eventTime ? values.eventTime : "",
        location: values.eventLocation,
        number_of_people: `${values.numberOfPeople} people`,
        tags: tags.join(", "), 
        tone: values.tone ? values.tone.join(", ") : ""
      };
  
      setLoading(true);
      axios.post('http://127.0.0.1:5000/generate_event_description', data)
        .then(res => {
          setDescription(res.data);
          form.setFieldsValue({ eventDescription: res.data });
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
  };
  


  const handleSubmit = (values) => {
    setLoading(true);
    const eventData = { ...values, eventDate: values.eventDate.format('YYYY-MM-DD') };

    axios.post('http://localhost:8080/api/events', eventData)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item label="Event Title" name="eventTitle" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Event Date" name="eventDate" rules={[{ required: true }]}>
        <DatePicker format='YYYY-MM-DD' />
      </Form.Item>

      <Form.Item label="Event Time" name="eventTime" rules={[{ required: true }]}>
        <Input type="time" />
      </Form.Item>

      <Form.Item label="Event Location" name="eventLocation" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Number of People" name="numberOfPeople" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Tags" name="tags">
        <Input placeholder="comma separated tags" />
      </Form.Item>

      <Form.Item label="Tone" name="tone">
        <Select mode="multiple" placeholder="Select tone">
          <Option value="friendly">Friendly</Option>
          <Option value="funny">Funny</Option>
          <Option value="serious">Serious</Option>
          <Option value="informal">Informal</Option>
          <Option value="formal">Formal</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Event Description" name="eventDescription">
        <Input.TextArea />
      </Form.Item>
      <Button onClick={handleDescription} loading={loading}>Generate Description</Button>

      <Form.Item label="Event Image URL" name="eventGallery">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>Create Event</Button>
      </Form.Item>
      <div className='sweet-loading'>
        <ClipLoader 
          size={150}
          color={"#123abc"}
          loading={loading}
        />
      </div>
    </Form>
  );
}

export default CreateEventView;
