import { BodyText, Box, Col, Row, WhiteBoldText } from "@styles/Common";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { theme } from "@styles/theme";

import kakaomap from "@src/assets/icons/map/kakao_map.png";
import pin from "@src/assets/icons/map/pin.png";
import web from "@src/assets/icons/map/web.png";
import cross from "@src/assets/icons/map/hospital.png";
import triangle from "@src/assets/icons/map/triangle.png";
import tory from "@src/assets/icons/map/tory_circle.png";
import x from "@src/assets/icons/x.png";
import { AroundMapHospital } from "@components/map/ArroundMap";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../Modal";
import useHospital from "@hooks/useHospital";
import sliceName from "@utils/client/sliceHospitalName";
import { CircleDefaultButton, RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";

interface MapDetailModalProps {
  clickIndex: number;
  setClickIndex: Dispatch<SetStateAction<number>>;
  index: number;
  hospital: AroundMapHospital;
}
const MapDetailModal = ({ clickIndex, setClickIndex, index, hospital }: MapDetailModalProps) => {
  const { handleClickAddHospital, handleClickDeleteHospital, showModal, setShowModal } = useHospital();
  const [isConnected, setIsConnected] = useState(hospital.my);
  return (
    <AnimatePresence>
      {clickIndex === index && (
        <CustomOverlayMap
          position={{
            lat: hospital.y!,
            lng: hospital.x!,
          }}
          yAnchor={1.1}
        >
          <InfoWindowBox>
            <TopArea>
              <Image src={tory} alt="사진" />
              <Name fontSize="20px">{hospital.name}</Name>
              <Box style={{ position: "absolute", right: "20px" }}>
                <CircleButton bgColor={theme.color.error} onClick={() => setClickIndex(-1)}>
                  <Image src={x} alt="x" />
                </CircleButton>
              </Box>
            </TopArea>
            <ContentBox>
              <AdressBox>
                <Image src={pin} alt="사진" />
                <AddressText title={hospital.address}>{hospital.address}</AddressText>

                <Link
                  href={`https://map.kakao.com/link/to/${hospital.name},${hospital.y},${hospital.x}`}
                  target="_blank"
                >
                  <Box>
                    <Image src={kakaomap} alt="kakao" width={20} height={20} />
                  </Box>
                </Link>
              </AdressBox>

              <DepartmentBox>
                <Image src={cross} alt="사진" />
                <BodyText title={`${hospital.medicalDepartments.map(i => i.medicalDepartment.department)}`}>
                  {/* {hospital.medicalDepartments?.map(({ medicalDepartment }, index) => (
                <span key={index}>{medicalDepartment.department}</span>
              ))} */}
                  {`${hospital.medicalDepartments[0].medicalDepartment.department} 외 ${hospital.medicalDepartments.length}개`}
                </BodyText>
              </DepartmentBox>
              <HomepageBox>
                <Image src={web} alt="사진" />
                {hospital.homepage ? (
                  <Link href={hospital.homepage} target="_blank" title={hospital.homepage}>
                    {hospital.homepage}
                  </Link>
                ) : (
                  <BodyText>-</BodyText>
                )}
              </HomepageBox>
            </ContentBox>
            <RoundButton
              sm
              bgColor={isConnected ? theme.color.error : "rgb(18, 212, 201)"}
              onClick={() => setShowModal(true)}
            >
              {isConnected ? "삭제" : "추가"}
            </RoundButton>
            <Tail src={triangle} alt="사진" />
          </InfoWindowBox>
        </CustomOverlayMap>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        activeFunction={
          isConnected
            ? () => {
                handleClickDeleteHospital(hospital.id, () => setIsConnected(false));
              }
            : () => {
                handleClickAddHospital(hospital.id, () => setIsConnected(true));
              }
        }
        agreeType={!isConnected}
        title="개인정보 수집 동의"
      >
        {isConnected ? (
          <p>
            <b>{sliceName(hospital.name)}</b>를 등록된 병원에서 제거하시겠습니까?
          </p>
        ) : (
          <>
            <p>병원을 추가하면 병원에서 나의 기록을 열람할 수 있습니다</p>
            <p>
              <b>{sliceName(hospital.name)}</b>에서 개인정보 수집 및 이용에 동의하십니까?
            </p>
          </>
        )}
      </Modal>
    </AnimatePresence>
  );
};
export default MapDetailModal;

const CircleButton  = styled(CircleDefaultButton)`
  width: 30px;
  height: 30px;
`
const RoundButton = styled(RoundedDefaultButton)`
  width :88px;
  height :40px;
  fontSize :16px;
  box-shadow: none;
`

const InfoWindowBox = styled(Col)`
  position: relative;
  background-color: white;
  border: none;
  border-radius: 20px;
  width: 560px;
  height: 300px;
  justify-content: space-between;
  position: relative;
  box-shadow: ${props => props.theme.boxShadow.normal};
  padding: 80px 0 20px;
`;
const TopArea = styled(Row)`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 20px 20px 0px 0px;
  background-color: #363cbf;
  width: 100%;
  height: 70px;
  justify-content: flex-start;
  padding-left: 30px;
`;
const Name = styled(WhiteBoldText)`
  margin-left: 20px;
`;
const ContentBox = styled(Col)`
  width: 100%;
  height: 120px;
  margin-top: 10px;
  justify-content: space-between;
`;
const AdressBox = styled(Box)`
  margin-left: 70px;
  gap: 10px;
  justify-content: flex-start;
  width: 100%;
`;
const AddressText = styled(BodyText)`
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const HomepageBox = styled(AdressBox)`
  transition: color 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.color.darkBg};
  }
`;
const DepartmentBox = styled(AdressBox)``;
const MapContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  z-index: 2000;
  background-color: white;
  width: 1450px;
  height: 760px;
  flex-direction: column;
  border-radius: 30px;
  justify-content: space-evenly;
  margin: auto;
`;
const Tail = styled(Image)`
  position: absolute;
  bottom: -37px;
`;
