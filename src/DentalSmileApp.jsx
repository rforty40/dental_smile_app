import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";
import { Provider } from "react-redux";
import { store } from "./store";

function DentalSmileApp() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppTheme>
            <AppRouter />
          </AppTheme>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default DentalSmileApp;
