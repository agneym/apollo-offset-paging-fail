import { Avatar, useGravatar } from "@agney/react-avatar";
import 'twin.macro';

function Person({ data }) {
  const url = useGravatar(data.email);
  return (
    <article tw="border border-gray-200 text-center px-4 py-6">
      <div tw="w-20 mx-auto mb-4 h-20">
        <Avatar src={url} text={data.firstName.slice(0, 2)} />
      </div>
      <h3 tw="font-semibold">{data.firstName} {data.lastName}</h3>
      <p tw="text-sm text-gray-500">{data.jobTitle}</p>
    </article>
  );
}

export default Person;

