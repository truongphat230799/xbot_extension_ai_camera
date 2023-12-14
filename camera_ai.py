import machine
from setting import *
from utility import *
from machine import UART

class AI_CAMERA:  
  def __init__(self, port):
    rx_pin = PORTS_DIGITAL[port][0]
    tx_pin = PORTS_DIGITAL[port][1]
    self.uart = machine.UART(2, baudrate=115200, rx=rx_pin,tx=tx_pin, timeout=10)
    self.uart.init(parity=None, stop=1, bits=8)
    self.current_classname = ''
    self.current_prediction = 0
    self.port = port
        

  def update(self):
    # flush old data and get latest one
    data = ''
    while self.uart.any():
      data = self.uart.readline()
    
    if data:
      try:
        self.current_classname, self.current_prediction = str(data[:-1].decode('utf-8')).split(";")
        self.current_prediction = float(self.current_prediction)*100
      except:
        self.current_classname = ''
        self.current_prediction = 0
    else:
      self.current_classname = ''
      self.current_prediction = 0

  '''
    reversed: 
      If True, function will return True if AI result != class_name
      If False, function will return True if AI result == class_name
  '''
  def check(self, class_name, prediction=0, reversed=False):
    if not reversed:
        if self.current_prediction >= prediction and self.current_classname == class_name:
          return True
        else:
          return False
    else:
      if (self.current_classname != class_name or self.current_prediction < prediction) \
        and self.current_classname != '':
          return True
      else:
        return False

  def get_classname(self):
    return self.current_classname
  
  def get_prediction(self):
    return self.current_prediction
