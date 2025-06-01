import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';
import type { Room } from '../../../interfaces';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { data: rooms, error } = await supabase
        .from('rooms')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) {
        console.error('Error listing rooms:', error);
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json(rooms);
    } catch (error) {
      console.error('Unexpected error listing rooms:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    const {
      name,
      description,
      type,
      isPublic,
      maxParticipants,
      createdBy,
      aiSettings,
      tags
    } = req.body;

    if (
      !name ||
      !description ||
      !type ||
      typeof isPublic !== 'boolean' ||
      !maxParticipants ||
      !createdBy ||
      !aiSettings
    ) {
      console.error('Missing required fields for room creation');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const { data: room, error } = await supabase
        .from('rooms')
        .insert({
          name,
          description,
          type,
          isPublic,
          maxParticipants,
          createdBy,
          aiSettings,
          tags,
          createdAt: new Date()
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating room:', error);
        return res.status(500).json({ error: error.message });
      }

      return res.status(201).json(room);
    } catch (error) {
      console.error('Unexpected error creating room:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}