import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateImage(prompt: string, filename: string) {
  console.log(`Generating ${filename}...`);
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
    });
    
    if (!response.candidates || response.candidates.length === 0) {
      console.error(`No candidates returned for ${filename}`);
      return;
    }

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        if (!fs.existsSync('public')) {
          fs.mkdirSync('public', { recursive: true });
        }
        fs.writeFileSync(`public/${filename}`, Buffer.from(base64EncodeString, 'base64'));
        console.log(`Saved ${filename}`);
        break;
      }
    }
  } catch (e) {
    console.error(`Error generating ${filename}:`, e);
  }
}

async function run() {
  await generateImage(
    "Photo réaliste d'un technicien utilisant une machine de nettoyage de tapis à brosses rotatives (encapsulation) sur une moquette de bureau grise. Éclairage professionnel, style net et moderne, haute résolution.",
    "encapsulation.jpg"
  );
  await generateImage(
    "Vue en contre-plongée d'un laveur de vitres utilisant une perche télescopique avec une brosse au sommet pour nettoyer les fenêtres d'un bâtiment moderne. On voit de l'eau pulvérisée sur le verre, aspect 'eau pure' sans mousse, ciel bleu en arrière-plan.",
    "eau-pure.jpg"
  );
}

run();
