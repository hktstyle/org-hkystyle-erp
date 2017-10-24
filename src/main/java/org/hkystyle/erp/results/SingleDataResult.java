/**
 * Copyright © 2017 hkystyle. All rights reserved.
 */
package org.hkystyle.erp.results;

/**
 * 单个数据返回
 * Created by hukaiyang on 2017/9/25.
 */
public class SingleDataResult<T> extends BaseResult {
    public SingleDataResult() {
        super();
    }

    public SingleDataResult(T data) {
        super();
        this.data = data;
    }

    /**
     * 返回数据
     */
    private T data;

    /**
     * 获取 返回数据
     */
    public T getData() {
        return this.data;
    }

    /**
     * 设置 返回数据
     */
    public void setData(T data) {
        this.data = data;
    }
}
