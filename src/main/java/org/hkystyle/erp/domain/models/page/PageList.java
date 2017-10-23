
package org.hkystyle.erp.domain.models.page;

import java.io.Serializable;
import java.util.List;

/**
 * Created by hukaiyang on 2017/10/14.
 */
public class PageList<T extends Serializable> implements Serializable {
    private List<T> dataList;
    private Pager pager;

    public List<T> getDataList() {
        return this.dataList;
    }

    public void setDataList(List<T> dataList) {
        this.dataList = dataList;
    }

    public Pager getPager() {
        return this.pager;
    }

    public void setPager(Pager pager) {
        this.pager = pager;
    }
}
