export default function Button({value}) {
  return (
    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      <button onClick={() => alert('Button clicked!')}>
        {value}
          
      </button>
    </div>
  );
}
