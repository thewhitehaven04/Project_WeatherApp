import style from './footer.css';
import logo from './../../resources/icons/GitHub_Logo.png';

function footerComponent() {
  const footer = document.createElement('footer');
  footer.classList.add('footer');

  const div = document.createElement('div');

  const builtSpan = document.createElement('span');
  builtSpan.textContent = 'Built for The Odin Project, 2023';

  const anchorGithub = document.createElement('a');
  anchorGithub.href = 'https://github.com/thewhitehaven04';

  const githubLogo = new Image(60, 24);
  githubLogo.src = logo;
  anchorGithub.appendChild(githubLogo);

  div.append(builtSpan, anchorGithub);
  div.classList.add('footer-info__flex');

  footer.append(div);
  return footer;
}

export { footerComponent };
