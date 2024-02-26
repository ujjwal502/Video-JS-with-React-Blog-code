const SpeedControl = ({ onChange }) => {
  return (
    <select
      onChange={(e) => onChange(parseFloat(e.target.value))}
      defaultValue="1"
    >
      <option value="0.5">0.5x</option>
      <option value="0.75">0.75x</option>
      <option value="1">Normal</option>
      <option value="1.25">1.25x</option>
      <option value="1.5">1.5x</option>
      <option value="2">2x</option>
    </select>
  );
};

export default SpeedControl;
