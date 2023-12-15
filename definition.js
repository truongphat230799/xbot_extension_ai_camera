Blockly.Blocks['xbot_init_camera'] = {
  init: function() {
    this.jsonInit(
      {
        type: "xbot_init_camera",
        message0: "khởi tạo camera AI cổng %1",
        previousStatement: null,
        nextStatement: null,
        args0: [
          {
            type: "field_dropdown",
            name: "port",
            options: [
              ["1", "0"],
              ["2", "1"],
              ["3", "2"],
              ["4", "3"],
              ["5", "4"],
              ["6", "5"],
            ],
          },],
        colour: "#00A06B",
        tooltip: "",
        helpUrl: ""
      }
    );
  }
};

Blockly.Blocks["ai_camera_check_result"] = {
  init: function () {
    this.jsonInit({
      colour: "#00A06B",
      tooltip: "",
      message0: "camera nhận dạng %1 %2 độ tin cậy > %3 %4",
      output: "Boolean",
      args0: [
        {
          type: "field_dropdown",
          name: "EQUAL",
          "options": [
            [
              "được là",
              "False"
            ],
            [
              "khác",
              "True"
            ]
          ]
        },
        {
          type: "input_value",
          name: "CLASS"          
        },
        { type: "input_value", name: "PREDICTION", check: "Number" },
        { type: "input_dummy" },
      ],
      helpUrl: "",
    });
  },
};

Blockly.Python['ai_camera_check_result'] = function(block) {
  // TODO: Assemble Python into code variable.
  var port = block.getFieldValue('PORT');
  var equal = block.getFieldValue('EQUAL');
  var prediction = Blockly.Python.valueToCode(block, 'PREDICTION', Blockly.Python.ORDER_ATOMIC);
  var string = Blockly.Python.valueToCode(block, 'CLASS', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_ai_camera'] = 'from xbot_camera_ai import *';
  var code = 'ai_cam.check(' + string + ', ' + prediction + ', ' + equal + ')';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["ai_camera_update"] = {
  init: function () {
    this.jsonInit({
      previousStatement: null,
      nextStatement: null,
      colour: "#00A06B",
      tooltip: "",
      message0: "camera cập nhật nhận dạng",
      args0: [
      ],
      helpUrl: "",
    });
  },
};

Blockly.Python['ai_camera_update'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'ai_cam.update()\n';
  return code;
};

Blockly.Blocks["ai_camera_get_classname"] = {
  init: function () {
    this.jsonInit({
      colour: "#00A06B",
      tooltip: "",
      message0: "đọc kết quả nhận dạng",
      args0: [
      ],
      output: null,      
      helpUrl: "",
    });
  },
};

Blockly.Python['ai_camera_get_classname'] = function(block) {
  // TODO: Assemble Python into code variable.
  var port = block.getFieldValue('PORT');
  var code = 'ai_cam.get_classname()';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["ai_camera_get_prediction"] = {
  init: function () {
    this.jsonInit({
      colour: "#00A06B",
      tooltip: "",
      message0: "độ tin cậy",
      message0: "đọc độ tin cậy",
      args0: [
      ],
      output: null,
      helpUrl: "",
    });
  },
};

Blockly.Python['ai_camera_get_prediction'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'ai_cam.get_prediction()';
  return [code, Blockly.Python.ORDER_NONE];
};



// Python Code

Blockly.Python['xbot_init_camera'] = function(block) {
  // TODO: Assemble Python into code variable.
  var port = block.getFieldValue('port');
  Blockly.Python.definitions_['import_camera_ai'] = 'from xbot_camera_ai import *';
  var code = 'ai_cam = AI_CAMERA(' + port + ')\n';
  return code;
};
