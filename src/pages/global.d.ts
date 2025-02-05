declare module "./components/PrivateRoute" {
    const PrivateRoute: React.FC<{ isAuthenticated: boolean }>;
    export default PrivateRoute;
  }