
export const showResults = (search, contacts, setStateFunction) => {
  if (contacts) {
    const filter = [];
    contacts
    .filter(a => (a.firstName + ' ' + a.lastName)
    .toLowerCase().indexOf(search.toLowerCase()) !== -1)
    .map(a => {
      if (a.firstName || a.lastName) {
        filter.push(a);
        return (
          setStateFunction(filter)
        );
      } else if (a.company) {
        filter.push(a);
        return (
          setStateFunction(filter)
        );
      }
    }
  );
  };
};

// export const showPhone = (item) => {
//   if (item.name) {
//     try {
//       return (
//         <View>
//             { item.phoneNumbers.map((data) => (
//                   <Text
//                     key={ data.key + data.number }
//                     style={ { fontFamily: 'Roboto-Light', }}>
//                     { (data.label) ? data.label + ': ' + data.number : 'phone: ' + data.number }
//                   </Text>
//               ))
//             }
//         </View>
//       );
//     } catch (err) {
//       return (null);
//     }
//   }
// };
