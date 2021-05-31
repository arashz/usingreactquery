import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

function Example() {
  const getStuff = () =>
    fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
      res.json(),
    );

  const { isLoading, error, data, isFetching, status } = useQuery(
    'stuff',
    getStuff,
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div style={{ padding: 20 }}>
      {status === 'success' &&
        !error &&
        data.map((d) => {
          return (
            <div style={{ padding: 5 }}>
              {d.name} : {d.email}
            </div>
          );
        })}
    </div>
  );
}

//export default App;
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
