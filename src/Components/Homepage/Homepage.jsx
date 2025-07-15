import { Card, Col, Row } from 'antd';
import { CgLivePhoto } from "react-icons/cg";
import { AiFillHeart } from "react-icons/ai";
import { AiFillFire } from "react-icons/ai";
import { AiFillLock } from "react-icons/ai";
import Message from '../Message/Message';
import Notification from '../Notification/Notification';
import Charts from '../Charts/Charts';
import Calender from '../Calender/Calender';

const Homepage = () => {
  // Mock data (replace with actual data if needed)
  const data = {
    liveTenders: 10,
    corrigendum: 5,
    privateTenders: 8,
    publishToday: 3
  };

  return (
    <>
      <div className="p-10">
      <Row gutter={16}>
        {/* Live Tenders Card */}
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="flex justify-center mb-4">
              <CgLivePhoto size={50} className="text-[#106390]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 text-center">Live FinWise</h3>
            <p className="text-2xl font-bold text-[#106390] text-center">{data.liveTenders}</p>
          </Card>
        </Col>

        {/* Corrigendum Card */}
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="flex justify-center mb-4">
              <AiFillHeart size={50} className="text-[#106390]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 text-center">Corrigendum</h3>
            <p className="text-2xl font-bold text-[#106390] text-center">{data.corrigendum}</p>
          </Card>
        </Col>

        {/* Private Tenders Card */}
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="flex justify-center mb-4">
              <AiFillFire size={50} className="text-[#106390]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 text-center">FinWise</h3>
            <p className="text-2xl font-bold text-[#106390] text-center">{data.privateTenders}</p>
          </Card>
        </Col>

        {/* Publish Today Card */}
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="flex justify-center mb-4">
              <AiFillLock size={50} className="text-[#106390]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 text-center">Publish Today</h3>
            <p className="text-2xl font-bold text-[#106390] text-center">{data.publishToday}</p>
          </Card>
        </Col>
      </Row>
    </div>

    <div className='mb-12'><Charts></Charts></div>

    <div className='flex mx-auto mb-12'>
    <div className='max-w-xl'><Message></Message></div>
    <div className='max-w-xl'><Notification></Notification></div>
    </div>

    <div className='max-w-xl'><Calender></Calender></div>
    
    </>
  );
};

export default Homepage;
