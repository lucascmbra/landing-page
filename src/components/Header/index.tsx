export default function Header() {
  return (
    <header className="header" aria-labelledby="header-title">
      <div className="header__content container">
        <span className="header__background-text" aria-hidden="true">
          Sobre
        </span>

        <h1 id="header-title" className="header__title">
          A melhor faculdade
          <br />
          de tecnologia
        </h1>
      </div>
    </header>
  )
}
