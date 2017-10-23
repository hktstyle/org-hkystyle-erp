/**
 * Copyright © 2017 北京易酒批电子商务有限公司. All rights reserved.
 */
package org.hkystyle.erp.results;

import org.hkystyle.erp.domain.models.page.PageList;

import java.io.Serializable;

/**
 * Created by hukaiyang on 2017/10/14.
 */
public class PagesResult<T extends Serializable> extends BaseResult {
    private PageList<T> datas;

    public PageList<T> getDatas() {
        return this.datas;
    }

    public void setDatas(PageList<T> datas) {
        this.datas = datas;
    }
}
