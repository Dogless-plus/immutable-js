var TypeKind = {
  Any: 0,

  Boolean: 1,
  Number: 2,
  String: 3,
  Object: 4,
  Array: 5,
  Never: 6,
  Function: 7,

  Param: 8,
  Type: 9,

  This: 10,
  Undefined: 11,
  Union: 12,
  Tuple: 13,
  Indexed: 14,
  Operator: 15
};

module.exports = TypeKind;