import App from "./App"
import { AppRouter } from "./AppRouter"
import { AuthProvider } from "./context/AuthContext"
import { ReactQueryContext } from "./context/ReactQueryContext"

export const AppHookContainer = () => {
  return (
    <ReactQueryContext>
      <AuthProvider>
        <App>
          <AppRouter />
        </App>
      </AuthProvider>
    </ReactQueryContext>
  )
}
