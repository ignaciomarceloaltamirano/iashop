import { MdSearchOff } from 'react-icons/md';

const NoResults = ({ term }) => {
  return (
    <div className="d-flex flex-column items-center justify-content-center p-4 text-center my-4">
      <p className="display-3 mb-4">
        <MdSearchOff />
      </p>
      <h2>No results found for {`"${term}"`}.</h2>
    </div>
  );
};

export default NoResults;
