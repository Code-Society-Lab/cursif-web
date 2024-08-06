import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { Socket } from 'phoenix';

export const PhoenixSocketContext = createContext(undefined);

export function PhoenixSocketProvider({ children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const socket = new Socket('ws://localhost:4000/socket', {
      params: {
        token: Cookies.get("token")
      }
    });

    socket.connect();
    setSocket(socket);
  }, []);

  if (!socket) return null;

  return (
    <PhoenixSocketContext.Provider value={{ socket }}>
      {children}
    </PhoenixSocketContext.Provider>
  );
};

export function useChannel(channelName) {
  const [channel, setChannel] = useState();
  const { socket } = useContext(PhoenixSocketContext);

  if (socket === undefined) {
    throw new Error('useChannel must be used within an PhoenixSocketProvider');
  }

  useEffect(() => {
    const phoenixChannel = socket.channel(channelName);

    phoenixChannel.join().receive('ok', () => {
      setChannel(phoenixChannel);
    });

    return () => {
      phoenixChannel.leave();
    };
  }, []);

  return channel;
};

PhoenixSocketProvider.propTypes = {
  children: PropTypes.node,
};