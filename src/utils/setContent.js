import Spinner from '../components/spinner/spinner';
import ErrorMessage from '../components/error-message/error-message';
import Skeleton from '../components/skeleton/skeleton'

const setContent = (process, Component, data) => {
   switch (process) {
      case 'waiting':
         return <Skeleton />;
      case 'loading':
         return <Spinner />;
      case 'confirmed':
         return <Component data={data} />;
      case 'error':
         return <ErrorMessage />;
      default:
         throw new Error('Unexpected process state')
   }
}

export default setContent;