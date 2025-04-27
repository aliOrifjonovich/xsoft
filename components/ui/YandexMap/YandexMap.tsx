// import React, { useState } from "react";
// import { useWatch } from "react-hook-form";
// import styles from "./YandexMap.module.scss";
// import { UseGeocoderAddresses } from "services/yandexMap.service";
// import { Input } from "../input";
// import useDebounce from "@/lib/utils";

// const YandexMap = ({ control, name, setValue, errors }) => {
//   const watchedAddress = useWatch({ control, name });
//   const [addressesFocus, setAddressesFocus] = useState(false);

//   const position = useWatch({ control, name: "position" });

//   const debouncedSearchAddress = useDebounce(watchedAddress, 700);
//   const { data: addresses } = UseGeocoderAddresses({
//     queryParams: debouncedSearchAddress,
//     querySettings: {
//       enabled: !!debouncedSearchAddress,
//     },
//   });

//   return (
//     <div>
//       <div style={{ position: "relative" }}>
//         <Input
//           name={name}
//           type="text"
//           control={control}
//           placeholder="Addres"
//           onChange={(e) => {
//             setValue(name, e.target.value);
//             setValue("searchAddress", e.target.value);
//             setAddressesFocus(true);
//           }}
//           validation={{
//             required: {
//               value: true,
//               message: "Обязательное поле",
//             },
//           }}
//           errors={errors}
//         />
//         {addressesFocus && (
//           <SearchAddressDropDown
//             setFocus={setAddressesFocus}
//             address={addresses?.GeoObjectCollection?.featureMember}
//             setValue={setValue}
//             name={name}
//           />
//         )}
//         <div className={styles.mapBox}>
//           <SuperYandexMap
//             zoom={10}
//             placemark={position}
//             setValue={setValue}
//             name={name}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default YandexMap;
