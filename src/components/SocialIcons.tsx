import { MdArrowOutward } from 'react-icons/md'
import './styles/SocialIcons.css'

const SocialIcons = () => {
  return (
    <div className="social-icons">
      <a
        href="https://github.com/ealejandro23"
        target="_blank"
        rel="noreferrer"
        data-cursor="disable"
        className="social-link"
      >
        GH <MdArrowOutward />
      </a>
      <a
        href="mailto:estebangambd@gmail.com"
        data-cursor="disable"
        className="social-link"
      >
        ML <MdArrowOutward />
      </a>
    </div>
  )
}

export default SocialIcons
