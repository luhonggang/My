// JavaScript Document
mydtree = new dTree('mydtree', 'assets/images/', 'no', 'no');
mydtree.add(0, -1, "集团", "javascript:setvalue('0','集团')", "集团", "_self", false);
 mydtree.add(1, 0, '钢联', "javascript:setvalue('1','钢联')", '钢联', '_self', false);
  mydtree.add(11, 1, '总裁办公室', "javascript:setvalue('11','总裁办公室')", '总裁办公室', '_self', false);
   mydtree.add(111, 11, '朱军红', "javascript:setvalue('111','朱军红')", '朱军红', '_self', false);
   mydtree.add(112, 11, '高波', "javascript:setvalue('112','高波')", '高波', '_self', false);
  mydtree.add(12, 1, '运营中心', "javascript:setvalue('12','运营中心')", '运营中心', '_self', false);
   mydtree.add(121, 12, '陈娟', "javascript:setvalue('121','陈娟')", '陈娟', '_self', false);
   mydtree.add(122, 12, '张端', "javascript:setvalue('122','张端')", '张端', '_self', false);
   mydtree.add(123, 12, '陈德亮', "javascript:setvalue('123','陈德亮')", '陈德亮', '_self', false);
   mydtree.add(124, 12, '设计部', "javascript:setvalue('124','设计部')", '设计部', '_self', false);
    mydtree.add(1241, 124, '马小平', "javascript:setvalue('1241','马小平')", '马小平', '_self', false);
	mydtree.add(1242, 124, '张兰', "javascript:setvalue('1242','张兰')", '张兰', '_self', false);
  mydtree.add(13, 1, '钢材事业部', "javascript:setvalue('13','钢材事业部')", '钢材事业部', '_self', false);


 mydtree.add(2, 0, '钢银电商', "javascript:setvalue('2','钢银电商')", '钢银电商', '_self', false);
 mydtree.add(3, 0, '物联网', "javascript:setvalue('3','物联网')", '物联网', '_self', false);
 mydtree.add(4, 0, '钢联宝', "javascript:setvalue('4','钢联宝')", '钢联宝', '_self', false);
 mydtree.add(5, 0, '百年建筑', "javascript:setvalue('5','百年建筑')", '百年建筑', '_self', false);

document.write(mydtree);