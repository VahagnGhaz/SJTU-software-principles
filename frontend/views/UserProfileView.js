import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, List, Typography } from "antd";
import '../css/style.css'
const { Title } = Typography;

function UserProfileView() {
    const [user, setUser] = useState(null);
    const [createdEvents, setCreatedEvents] = useState([]);
    const [participatedEvents, setParticipatedEvents] = useState([]);
    const Navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
      console.log("userId: ", userId);
        if (!userId) {
            Navigate("/login");
        } else {
            // Fetch user data
            axios.get(`http://localhost:8080/api/users/${userId}`)
                .then(res => {
                    setUser(res.data);
                })
                .catch(error => {
                    console.log(error);
                });

            // Fetch created events
            axios.get(`http://localhost:8080/api/users/organizedEvents/${userId}`)
                .then(res => {
                    setCreatedEvents(res.data);
                })
                .catch(error => {
                    console.log(error);
                });

            // Fetch participated events
            axios.get(`http://localhost:8080/api/users/participatedEvents/${userId}`)
                .then(res => {
                    setParticipatedEvents(res.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [userId, Navigate]);

    return (
      <div className="user-profile">

            {user && (
                <div>
                    <Card title="User Information" style={{ width: 300 }}>
                        <p><strong>Username: </strong> {user.username}</p>
                        <p><strong>Email: </strong> {user.email}</p>
                    </Card>

                    <Title level={3}>Created Events:</Title>
                    <List
                        itemLayout="horizontal"
                        dataSource={createdEvents}
                        renderItem={event => (
                            <List.Item>
                                <List.Item.Meta
                                    title={event.eventTitle}
                                />
                            </List.Item>
                        )}
                    />

                    <Title level={3}>Participated Events:</Title>
                    <List
                        itemLayout="horizontal"
                        dataSource={participatedEvents}
                        renderItem={event => (
                            <List.Item>
                                <List.Item.Meta
                                    title={event.eventTitle}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            )}
        </div>
    );
}

export default UserProfileView;
