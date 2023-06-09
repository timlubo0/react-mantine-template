import { Error } from '../components/Error';

export function AccessDeniedScreen() {

    return (
      <>
        <Error
          title="Access denied..."
          image='"/assets/images/401-error.svg"'
          message="Page you are trying to open is not accessible. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error contact support."
        />
      </>
    );
}