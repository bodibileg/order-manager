import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Header />
        <Home />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
