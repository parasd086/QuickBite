//here, code that uses Auth0 SDK to connect to our Auth0 a/c

import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { useCreateMyUser } from "../api/MyUserApi";

type Props = {
  children: React.ReactNode;
};

//this provider will wrap all the components in our app that needs Auth0 stuff
const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const { createUser } = useCreateMyUser();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  if (!domain || !clientId || !redirectUri) {
    throw new Error("Unable to initialise auth");
  }

  //this function gets called when the user gets redirected back to our app
  //appState- is going to contain some stored data that we might need when the user gets redirected back
  const onRedirectCallback = (appState?: AppState, user?: User) => {
    console.log(user);
    if (user?.sub && user?.email) {
      createUser({ auth0Id: user.sub, email: user.email });
    }
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
