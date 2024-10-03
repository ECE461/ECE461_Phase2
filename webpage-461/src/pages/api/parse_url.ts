// pages/api/parse-url.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { CLIParser } from '../../code/cli_parse';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const cliParser = new CLIParser();
    await cliParser.handleAction(url);
    res.status(200).json({ message: 'URL parsed successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}