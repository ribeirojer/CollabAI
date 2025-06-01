import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../lib/supabase';
import type { Room } from '../../../../interfaces';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid room id' });
  }

  if (req.method === 'GET') {
    try {
      const { data: room, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching room:', error);
        return res.status(500).json({ error: error.message });
      }

      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }

      return res.status(200).json(room);
    } catch (error) {
      console.error('Unexpected error fetching room:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    const updates = req.body;
    try {
      const { data: room, error } = await supabase
        .from('rooms')
        .update(updates)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error updating room:', error);
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json(room);
    } catch (error) {
      console.error('Unexpected error updating room:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { error } = await supabase
        .from('rooms')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting room:', error);
        return res.status(500).json({ error: error.message });
      }

      return res.status(204).end();
    } catch (error) {
      console.error('Unexpected error deleting room:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}