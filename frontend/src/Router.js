// src/Router.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutView from './components/LayoutView';
import EventsView from './views/EventsView';
import CreateEventView from './views/CreateEventView';
import ProfileView from './views/UserProfileView';
import EventDetailsView from './views/EventDetailsView';
import LoginView from './views/LoginView';
import RegistrationView from './views/RegistrationView';

const Router = () => {
  return (
    <BrowserRouter>
      <LayoutView>
        <Routes>
          <Route path="/events" element={<EventsView />} />
          <Route path="/create-event" element={<CreateEventView />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegistrationView />} />
          <Route path="/eventDetails" element={<EventDetailsView />} />
          <Route path="/" element={<EventsView />} exact />
        </Routes>
      </LayoutView>
    </BrowserRouter>
  );
};

export default Router;
