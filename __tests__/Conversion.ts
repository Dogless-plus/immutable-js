///<reference path='../resources/jest.d.ts'/>
jest.autoMockOff();
import Immutable = require('../dist/Immutable');
import Map = Immutable.Map;
import OrderedMap = Immutable.OrderedMap;
import Vector = Immutable.Vector;

declare function expect(val: any): ExpectWithIs;

interface ExpectWithIs extends Expect {
  is(expected: any): void;
  not: ExpectWithIs;
}

// This doesn't work yet because of a jest bug with instanceof.
describe('Conversion', () => {

  beforeEach(function () {
    this.addMatchers({
      is: function(expected) {
        return Immutable.is(this.actual, expected);
      }
    });
  });

  // Note: order of keys based on Map's hashing order
  var js = {
    deepList: [
      {
        position: "first"
      },
      {
        position: "second"
      },
      {
        position: "third"
      },
    ],
    deepMap: {
      a: "A",
      b: "B"
    },
    point: {x: 10, y: 20},
    string: "Hello",
    list: [1, 2, 3]
  };

  var immutableData = Map({
    deepList: Vector(
      Map({
        position: "first"
      }),
      Map({
        position: "second"
      }),
      Map({
        position: "third"
      })
    ),
    deepMap: Map({
      a: "A",
      b: "B"
    }),
    point: Map({x: 10, y: 20}),
    string: "Hello",
    list: Vector(1, 2, 3)
  });

  var immutableOrderedData = OrderedMap({
    deepList: Vector(
      OrderedMap({
        position: "first"
      }),
      OrderedMap({
        position: "second"
      }),
      OrderedMap({
        position: "third"
      })
    ),
    deepMap: OrderedMap({
      a: "A",
      b: "B"
    }),
    point: OrderedMap({x: 10, y: 20}),
    string: "Hello",
    list: Vector(1, 2, 3)
  });

  it('Converts deep JS to deep immutable sequences', () => {
    expect(Immutable.fromJSON(js)).is(immutableData);
  });

  it('Converts deep JSON with custom conversion', () => {
    var seq = Immutable.fromJSON(js, function (key, sequence) {
      return Array.isArray(this[key]) ? sequence.toVector() : sequence.toOrderedMap();
    });
    expect(seq).is(immutableOrderedData);
  });

  it('Converts deep sequences to JSON', () => {
    var json = immutableData.toJSON();
    expect(json).not.is(js); // raw JS is not immutable.
    expect(json).toEqual(js); // but should be deep equal.
  });

  it('JSON.stringify() works equivalently on immutable sequences', () => {
    expect(JSON.stringify(js)).toBe(JSON.stringify(immutableData));
  });

});