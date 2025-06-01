import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../lib/supabase';
import type { RoomParticipant } from '../../../../interfaces';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid room id' });
  }

  const { userId, role } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId in request body' });
  }

  const newParticipant: RoomParticipant = {
    roomId: id,
    userId,
    role: role || 'member',
    joinedAt: new Date(),
    lastActive: new Date(),
    status: 'online'
  };

  try {
    const { data: participant, error } = await supabase
      .from('room_participants')
      .insert(newParticipant)
      .single();

    if (error) {
      console.error('Error joining room:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(participant);
  } catch (error) {
    console.error('Unexpected error joining room:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}