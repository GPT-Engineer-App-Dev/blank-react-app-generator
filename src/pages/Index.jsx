import { Container, Text, VStack, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useEvents, useAddEvent } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: events, isLoading, error } = useEvents();
  const addEventMutation = useAddEvent();
  const [newEvent, setNewEvent] = useState({ name: "", date: "", description: "", venue_id: 1, is_pinned: false });

  const handleAddEvent = () => {
    addEventMutation.mutate(newEvent);
    setNewEvent({ name: "", date: "", description: "", venue_id: 1, is_pinned: false });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Your Blank Canvas</Text>
        <Text>Chat with the agent to start making edits.</Text>
        {isLoading ? (
          <Text>Loading events...</Text>
        ) : error ? (
          <Text>Error loading events</Text>
        ) : (
          events.map(event => (
            <Text key={event.id}>{event.name} - {event.date}</Text>
          ))
        )}
        <Input placeholder="Event Name" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
        <Input placeholder="Event Date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
        <Input placeholder="Event Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
        <Button onClick={handleAddEvent}>Add Event</Button>
      </VStack>
    </Container>
  );
};

export default Index;