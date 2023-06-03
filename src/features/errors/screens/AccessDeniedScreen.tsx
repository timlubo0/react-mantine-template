import { Error } from '../components/Error';

export function AccessDeniedScreen() {

    return (
      <>
        <Error
          title="Something is not right..."
          message="Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error contact support."
        />
      </>
    );
}