
import DolyameIntegration from './DolyameIntegration';
import Router from './router/Router'
import "slick-carousel/slick/slick.css";
export default function App() {
  return (
    <div>
        <Router/>
        <DolyameIntegration />
        {/* <CustomSelect title='Котегории' value={arr} /> */}
    </div>
  )
}
