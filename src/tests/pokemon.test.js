import randomizePokemon from "../components/pokemon";

const mockData = {data: []};

for (let i = 0; i < 100; i += 1) {
  mockData.data.push(i);
}

test('10 pokemon are chosen', () => {
  const random = randomizePokemon(mockData);
  expect(random.length).toBe(10);
})