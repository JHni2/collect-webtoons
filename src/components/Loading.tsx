import { Modal } from 'react-bootstrap'
import FadeLoader from 'react-spinners/FadeLoader'

interface IModal {
  show: boolean
  onHide: () => void
}

const Loading = ({ show, onHide }: IModal) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="contentWrap">
        <div
          className="flex flex-col !gap-6 items-center p-12 bg-white border rounded-2xl"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <FadeLoader color="#d0d4dd" height={15} width={5} radius={2} margin={2} />
          <div className="flex flex-col items-center leading-7 font-semibold">
            <p>로그인중입니다.</p>
            <p>잠시만 기다려주세요.</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default Loading
