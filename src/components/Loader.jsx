export default function Loader({ hidden }) {
  return (
    <div className={`loader-screen${hidden ? ' loader-hidden' : ''}`} aria-hidden={hidden}>
      <img src={`${import.meta.env.BASE_URL}assets/mylogo.png`} alt="" className="loader-logo" />
    </div>
  );
}
