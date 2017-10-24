package org.hkystyle.erp.controllers;

import org.hkystyle.erp.domain.models.page.PageList;
import org.hkystyle.erp.domain.models.privilege.PrivilegeIndexVO;
import org.hkystyle.erp.results.BaseResult;
import org.hkystyle.erp.results.DataResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hukaiyang on 2017/10/14.
 */

@RestController
public class PrivilegeController {
    @RequestMapping(value = "/templates/findUserPrivilegeList", method = RequestMethod.POST)
    public BaseResult findPrivilegeIndexList() {
        PageList<PrivilegeIndexVO> poList = new PageList<PrivilegeIndexVO>();
        List<PrivilegeIndexVO> dataList = new ArrayList<>();

        PrivilegeIndexVO vo1 = new PrivilegeIndexVO();
        vo1.setIcon("fa fa-reorder");
        vo1.setPrivilegeCode("index");
        vo1.setPrivilegeName("首页");
        vo1.setPrivilegeType("Menu");
        vo1.setSequence(null);
        vo1.setSonIndex(null);
        vo1.setTitle("首页");
        vo1.setUrl("#/dashboard.html");

        PrivilegeIndexVO vo2 = new PrivilegeIndexVO();
        vo2.setIcon("fa fa-reorder");
        vo2.setPrivilegeCode("product");
        vo2.setPrivilegeName("产品管理");
        vo2.setPrivilegeType("Menu");
        vo2.setSequence(null);
        vo2.setSonIndex(null);
        vo2.setTitle("产品管理");
        vo2.setUrl("#/product_list.html");

        dataList.add(vo1);
        dataList.add(vo2);
        poList.setDataList(dataList);


        DataResult<PrivilegeIndexVO> privilegeIndexVODataResult = new DataResult<>();
        privilegeIndexVODataResult.setDatas(poList);
        return privilegeIndexVODataResult;
    }
}
