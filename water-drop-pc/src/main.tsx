import ReactDOM from "react-dom/client"
import "./index.css"
import { ApolloProvider } from "@apollo/client"
import { client } from "./utils/apollo.ts"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { routes } from "./routes/menu.tsx"
import UserInfo from "./components/UserInfo/index.tsx"
import Layout from "./components/Layout/index.tsx"
import Login from "./containers/Login/index.tsx"
import { ROUTE_COMPONENT } from "./routes/index.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <UserInfo>
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/"
            element={<Layout />}
          >
            {routes.map((item) => {
              const Component = ROUTE_COMPONENT[item.key]
              return (
                <Route
                  key={item.path}
                  path={item.path}
                  element={<Component />}
                />
              )
            })}
          </Route>
        </Routes>
      </UserInfo>
    </BrowserRouter>
  </ApolloProvider>
)
