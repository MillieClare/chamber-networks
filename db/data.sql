-- Chamber data
INSERT INTO chambers (id, latitude, longitude, total_capacity, used_capacity, geom)
VALUES
(
    'VORB-X8734',
    51.52466903333144,
    -0.08320212364196779,
    100,
    70,
    ST_SetSRID(ST_MakePoint(-0.08320212364196779, 51.52466903333144), 4326)
),
(
    'VORB-Z4784',
    51.523641015718525,
    -0.08601307868957521,
    100,
    10,
    ST_SetSRID(ST_MakePoint(-0.08601307868957521, 51.523641015718525), 4326)
),
(
    'VORB-N2837',
    51.523434943212514,
    -0.08114755153656007,
    100,
    40,
    ST_SetSRID(ST_MakePoint(-0.08114755153656007, 51.523434943212514), 4326)
),
(
    'VORB-V9345',
    51.52211691871454,
    -0.0851869583129883,
    100,
    30,
    ST_SetSRID(ST_MakePoint(-0.0851869583129883, 51.52211691871454), 4326)
),
(
    'VORB-Q9547',
    51.523304662537235,
    -0.08331477642059326,
    100,
    70,
    ST_SetSRID(ST_MakePoint(-0.08331477642059326, 51.523304662537235), 4326)
);

INSERT INTO customers (customer_name, street_address, postcode, building_latitude, building_longitude, chamberId) VALUES
('customer_one', 'one_lane', 'A1 2BC', 51.524669, -0.083202, 'VORB-X8734'),
('customer_two', 'two_lane', 'D2 3EF', 51.524669, -0.083202, 'VORB-X8734'),
('customer_three', 'three_lane', 'G3 4HI', 51.524669, -0.083202, 'VORB-X8734'),
('customer_four', 'four_lane', 'J5 6KL', 51.524669, -0.083202, 'VORB-X8734'),
('customer_five', 'five_lane', 'M7 8NO', 51.524669, -0.083202, 'VORB-X8734'),
('customer_six', 'six_lane', 'P9 0QR', 51.524669, -0.083202, 'VORB-X8734'),
('customer_seven', 'seven_lane', 'S1 2TU', 51.524669, -0.083202, 'VORB-X8734'),
('customer_eight', 'eight_lane', 'V3 4WX', 51.523641, -0.086013, 'VORB-Z4784'),
('customer_nine', 'nine_lane', 'Y5 6ZA', 51.523434, -0.081147, 'VORB-N2837'),
('customer_ten', 'ten_lane', 'B7 8CD', 51.523434, -0.081147, 'VORB-N2837'),
('customer_eleven', 'eleven_lane', 'E9 0FG', 51.523434, -0.081147, 'VORB-N2837'),
('customer_twelve', 'twelve_lane', 'H1 2IJ', 51.523434, -0.081147, 'VORB-N2837'),
('customer_thirteen', 'thirteen_lane', 'J3 4KL', 51.522116, -0.085186, 'VORB-V9345'),
('customer_fourteen', 'fourteen_lane', 'M5 6NO', 51.522116, -0.085186, 'VORB-V9345'),
('customer_fifteen', 'fifteen_lane', 'P7 8QR', 51.522116, -0.085186, 'VORB-V9345'),
('customer_sixteen', 'sixteen_lane', 'S9 0TU', 51.523304, -0.083314, 'VORB-Q9547'),
('customer_seventeen', 'seventeen_lane', 'V1 2WX', 51.523304, -0.083314, 'VORB-Q9547'),
('customer_eighteen', 'eighteen_lane', 'Y3 4ZA', 51.523304, -0.083314, 'VORB-Q9547'),
('customer_nineteen', 'nineteen_lane', 'B5 6CD', 51.523304, -0.083314, 'VORB-Q9547'),
('customer_twenty', 'twenty_lane', 'E7 8FG', 51.523304, -0.083314, 'VORB-Q9547'),
('customer_twentyone', 'twentyone_lane', 'H9 0IJ', 51.523304, -0.083314, 'VORB-Q9547'),
('customer_twentytwo', 'twentytwo_lane', 'K1 2LM', 51.523304, -0.083314, 'VORB-Q9547');
