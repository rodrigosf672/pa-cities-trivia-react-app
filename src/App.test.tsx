import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameGrid from './components/GameGrid';

// City data array
const citiesData = [
  { name: "Philadelphia", image: "/images/philadelphia.jpg", fact: "The Liberty Bell is here!" },
  { name: "Pittsburgh", image: "/images/pittsburgh.jpg", fact: "Known for its many bridges." },
  { name: "Harrisburg", image: "/images/harrisburg.jpg", fact: "The capital of Pennsylvania." },
  { name: "Allentown", image: "/images/allentown.jpg", fact: "Known for Billy Joel's famous song." },
  { name: "Erie", image: "/images/erie.jpg", fact: "Located on the shore of a lake." },
  { name: "Scranton", image: "/images/scranton.jpg", fact: "Famous for 'The Office' TV show." },
  { name: "Lancaster", image: "/images/lancaster.jpg", fact: "Famous for its Amish community." },
  { name: "Bethlehem", image: "/images/bethlehem.jpg", fact: "Known for its Christmas traditions." },
  { name: "Reading", image: "/images/reading.jpg", fact: "Known more for its railroads than for its name's literary association." },
  { name: "York", image: "/images/york.jpg", fact: "Not the Big Apple, but it's known for its rich colonial history." },
  { name: "Wilkes-Barre", image: "/images/wilkesbarre.jpg", fact: "Located near the Pocono Mountains. Has a dash in the name." },
  { name: "Altoona", image: "/images/altoona.jpg", fact: "Home of the Horseshoe Curve." },
  { name: "Johnstown", image: "/images/johnstown.jpg", fact: "Known for the Great Flood of 1889." },
  { name: "Chester", image: "/images/chester.jpg", fact: "The oldest city of PA, right along the Delaware River." },
  { name: "Easton", image: "/images/easton.jpg", fact: "Home to the Crayola Experience. Not Northon, not Weston, it's rather..." },
  { name: "State College", image: "/images/statecollege.jpg", fact: "Home to Penn State University." },
];

test('renders the game header and input field', () => {
  render(<GameGrid />);
  const headerText = screen.getByText(/select a square and guess the city name/i);
  expect(headerText).toBeInTheDocument();

  const inputField = screen.getByRole('textbox', { name: /select a square and guess the city name:/i });
  expect(inputField).toBeInTheDocument();
});

test('selecting a city highlights the correct square', async () => {
  const { container } = render(<GameGrid />);
  const citySquares = container.querySelectorAll('.grid-item');
  const citySquare = citySquares[0] as HTMLElement;

  await userEvent.click(citySquare);

  // The background color should change after selection
  await waitFor(() => {
    expect(citySquare).toHaveStyle('background-color: #ecf0f1');
  });
});

test('correct guess displays success feedback', async () => {
  const { container } = render(<GameGrid />);
  const citySquares = container.querySelectorAll('.grid-item');
  const citySquare = citySquares[0] as HTMLElement;

  await userEvent.click(citySquare);

  // Get the displayed image and retrieve the city name from the alt attribute
  const image = await screen.findByRole('img') as HTMLImageElement;
  expect(image).toBeInTheDocument();

  const cityName = image.alt;

  const inputField = screen.getByRole('textbox');
  await userEvent.clear(inputField);
  await userEvent.type(inputField, cityName);

  const submitButton = screen.getByRole('button', { name: /submit/i });
  await userEvent.click(submitButton);

  // Match the exact feedback message, including emojis
  const successMessage = await screen.findByText('🎉 Congrats! You got it! 🎉');
  expect(successMessage).toBeInTheDocument();
});

test('incorrect guess displays failure feedback', async () => {
  const { container } = render(<GameGrid />);
  const citySquares = container.querySelectorAll('.grid-item');
  const citySquare = citySquares[0] as HTMLElement;

  await userEvent.click(citySquare);

  const inputField = screen.getByRole('textbox');
  await userEvent.clear(inputField);
  await userEvent.type(inputField, 'IncorrectCity');

  const submitButton = screen.getByRole('button', { name: /submit/i });
  await userEvent.click(submitButton);

  const failureMessage = await screen.findByText('❌ You failed! Try again.');
  expect(failureMessage).toBeInTheDocument();
});

test('toggle hint button shows and hides hint', async () => {
  const { container } = render(<GameGrid />);
  const citySquares = container.querySelectorAll('.grid-item');
  const citySquare = citySquares[0] as HTMLElement;

  await userEvent.click(citySquare);

  const image = await screen.findByRole('img') as HTMLImageElement;
  const cityName = image.alt;

  // Find the city data based on the city name
  const cityData = citiesData.find(city => city.name === cityName);
  expect(cityData).toBeDefined();
  const hintText = cityData!.fact;

  const hintButton = screen.getByRole('button', { name: /show hint/i });
  await userEvent.click(hintButton);

  // Find the hint text dynamically
  const hint = await screen.findByText(hintText);
  expect(hint).toBeInTheDocument();

  await userEvent.click(hintButton);
  expect(screen.queryByText(hintText)).not.toBeInTheDocument();
});