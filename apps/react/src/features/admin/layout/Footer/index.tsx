import { Layout } from 'antd';
import './index.css';

const Footer = ({ white = false }) => {
  return (
    <Layout.Footer className={`admin-footer ${white && 'white'}`}>
      Footer
    </Layout.Footer>
  );
};

export default Footer;
