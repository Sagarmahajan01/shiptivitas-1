import React, { useState } from 'react';
import './KanbanBoard.css'; // Add your custom CSS for styling the Kanban board

const KanbanBoard = () => {
  const [shippingRequests, setShippingRequests] = useState([
    { id: 1, description: 'Package 1', lane: 'To-Do' },
    { id: 2, description: 'Package 2', lane: 'In-Progress' },
    { id: 3, description: 'Package 3', lane: 'Complete' },
    // Add more shipping requests here
  ]);

  const handleDrop = (event, targetLane) => {
    event.preventDefault();
    const requestId = event.dataTransfer.getData('requestId');
    const updatedRequests = shippingRequests.map((request) => {
      if (request.id.toString() === requestId) {
        return { ...request, lane: targetLane };
      }
      return request;
    });
    setShippingRequests(updatedRequests);
  };

  const handleDragStart = (event, requestId) => {
    event.dataTransfer.setData('requestId', requestId.toString());
  };

  return (
    <div className="kanban-board">
      <div className="lane">
        <h2>To-Do Lane</h2>
        {shippingRequests.map((request) => {
          if (request.lane === 'To-Do') {
            return (
              <div
                key={request.id}
                className="request"
                draggable
                onDragStart={(event) => handleDragStart(event, request.id)}
              >
                {request.description}
              </div>
            );
          }
          return null;
        })}
      </div>

      <div
        className="lane"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => handleDrop(event, 'In-Progress')}
      >
        <h2>In-Progress Lane</h2>
        {shippingRequests.map((request) => {
          if (request.lane === 'In-Progress') {
            return (
              <div
                key={request.id}
                className="request"
                draggable
                onDragStart={(event) => handleDragStart(event, request.id)}
              >
                {request.description}
              </div>
            );
          }
          return null;
        })}
      </div>

      <div
        className="lane"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => handleDrop(event, 'Complete')}
      >
        <h2>Complete Lane</h2>
        {shippingRequests.map((request) => {
          if (request.lane === 'Complete') {
            return (
              <div
                key={request.id}
                className="request"
                draggable
                onDragStart={(event) => handleDragStart(event, request.id)}
              >
                {request.description}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
