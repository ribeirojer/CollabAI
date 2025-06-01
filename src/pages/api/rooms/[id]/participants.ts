import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../lib/supabase';
import type { RoomParticipant } from '../../../../interfaces';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid room id' });
  }

  try {
    const { data: participants, error } = await supabase
      .from('room_participants')
      .select('*')
      .eq('roomId', id)
      .order('joinedAt', { ascending: true });

    if (error) {
      console.error('Error listing participants:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(participants);
  } catch (error) {
    console.error('Unexpected error listing participants:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}