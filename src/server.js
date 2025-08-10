import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import chalk from 'chalk';
import figlet from 'figlet';
import boxen from 'boxen';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import destinationRoutes from './routes/destinationRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

const PORT = 4321;

// http://localhost/api
app.use('/api', commentRoutes);
app.use('/api', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/users', userRoutes);

const quotesList = [
  ' ~ "Code is like humor. When you have to explain it, it’s bad." – Cory House',
  ' ~ "First, solve the problem. Then, write the code." – John Johnson',
  ' ~ "Simplicity is the soul of efficiency." – Austin Freeman',
  ' ~ "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." – Martin Fowler',
  ' ~ "Fix the cause, not the symptom." – Steve Maguire',
  ' ~ "Experience is the name everyone gives to their mistakes." – Oscar Wilde',
  ' ~ "In order to be irreplaceable, one must always be different." – Coco Chanel',
  ' ~ "Knowledge is power, but enthusiasm pulls the switch." – Ivern Ball',
];
const randomQuote = quotesList[Math.floor(Math.random() * quotesList.length)];

app.listen(PORT, () => {
  console.clear();

  // Judul / Banner
  const title = chalk.green(
    figlet.textSync('Vuetyfull API', {
      font: 'Slant',
      horizontalLayout: 'default',
    })
  );

  // Deskripsi utama
  const description = `
${chalk.bold.greenBright('BACKEND SERVER IS ON!')}
${chalk.bold('Listening on:')} ${chalk.cyan(`http://localhost:${PORT}`)}

${chalk.gray('Backend Structure Initialized')}
${chalk.red.bold('Ctrl + C')} ${chalk.gray('to shut down the server')}
  `.trim();

  // Box fancy
  const innerBox = boxen(description, {
    padding: 1,
    margin: 0,
    borderStyle: 'round',
    borderColor: 'gray',
    backgroundColor: '#000000',
  });

  // Middle box (double line)
  const middleBox = boxen(innerBox, {
    padding: 1,
    margin: 0,
    borderStyle: 'double',
    borderColor: 'green',
    backgroundColor: '#000000',
  });

  // Output
  console.log(title);
  console.log(middleBox);

  // Tips Section
  console.log(chalk.bold.hex('#AAAAAA')('\nMotivational Quote of the Day: \n'));
  console.log(chalk.gray(`${randomQuote}\n`));
});
