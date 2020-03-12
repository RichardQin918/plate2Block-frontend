### Info ###
##### name: Ziming Qin #####
##### student#: 101278511 #####
##### name: Shermeen Kazi #####
##### student#: 101270927 #####
##### name: Estella Yeung #####
##### student#: 100316780 #####

# Architecture
## Goal
#### To build a web application on which users can look up ownership of license plate, as well as generate & register themselves new plate through Hyperloedger-fabric
## Data
### User Interface Data
##### Username(FirstName, LastName) string
##### UserAddresses string
##### VIN number string
##### Plate number 7-digit integer
### Smart Contract Data
##### Address OwnerAddress
##### String Username
##### String UserAddress
##### String VIN number
##### Uint256 Plate number
##### Mapping OwnerAddress => list of Plates
##### Mapping Username => OwnerAddress
##### Mapping OwnerAddress => Username
##### Mapping Plate => OwnerAddress
## Functions
### User Interface functions
##### searchInfoByETHAddress(eth address)returns object
##### searchInfoByVIN(VIN)returns object
##### searchInfoByPlate(plate)returns object
##### registerNewPlate(username, userAddress, VIN, plate#) returns bool
##### renew/updatePlate(username, userAddress, VIN, plate#) returns bool
##### changeOwnership(plate#) returns string
### Smart Contract functions
##### getInfoByAddress(address address) returns array
##### getInfoByVIN(string VIN) returns array
##### getInfoByPlate(uint256 plate) returns array
##### isOwner(uint256 plate#, address address) returns bool
##### register(uint256 plate#, address address) returns object
##### register(uint256 plate#, address address) returns object
##### register(uint256 plate#, address address) returns object

## Type of Architecture
### UserInterface
##### reactJS/html/css + nodejs

## Unfinished work ##
## partially unfinished due to lack of time/references and heavy personal work-schedule