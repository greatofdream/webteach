# 大语言模型（LLM）
[交大的课程资料](https://github.com/Lordog/dive-into-llms) [昇腾的类似的课程与资料](https://www.hiascend.com/edu/growth/lm-development#classification-floor-1)

## 论文
+ 综述
  + [A Survey of Large Language Models](https://arxiv.org/abs/2303.18223) [大语言模型 中文版](https://llmbook-zh.github.io/)
+ Seq2Seq:
+ Transformer:
  + [Attention is all you needed](https://arxiv.org/abs/1706.03762) [youtube 超级详细讲解](https://youtu.be/ugWDIIOHtPA?si=wsJaXwAypp-T29NU) [知乎](https://zhuanlan.zhihu.com/p/338817680)
  + 如果没有位置向量使得 输入元素X的交换操作P后为PX，产生的输出为P`softmax(QK)V`，[仅仅使得输出元素交换位置](https://www.reddit.com/r/deeplearning/comments/1ew4dv4/transformers_without_positional_encodings/)。也有论文测试了没有位置向量的情况，[看起来表现差不多](https://arxiv.org/abs/2203.16634)，引用率几乎为0，说明LLM主流认为位置向量仍然是有存在的必要。
  + Decoder在第一个Multi-head attentaion中计算`softmax(MQK)`，其中`M`为mask。
+ BERT:
+ RAG: 
  + 综述：[Towards Agentic RAG with Deep Reasoning: ASurvey of RAG-Reasoning Systems in LLMs](https://arxiv.org/pdf/2507.09477)
  + [开发实战](https://datawhalechina.github.io/all-in-rag/#/)

## 大语言模型 中文版
+ 大语言模型的演化：统计学习语言模型（n-gram）、神经网络语言模型（word2vec使用无标注文本学习词嵌入表示）、预训练语言模型（ELMo、BERT、GPT-1 预训练-微调模式）、大语言模型（Scaling Law等） 
  + Scaling Law 
  + Emergence 涌现：看起来是唯象理论，没有严谨的证据。In context learning, Instruction following, Step-by-step reasoning。
+ 预训练
  + 数据预处理：质量过滤、敏感内容过滤、数据去重
  + 分词（Tokenization）：BPE分词、WordPiece分词、Unigram分词
  + 数据调度：先在小模型上tune数据类型配比
  + 模型架构：
    + Tranformer结构
    + 归一化方法、归一化模块位置、激活函数、位置编码、注意力机制、混合专家模型
  + 主流架构：编码器架构、解码器架构（因果解码器、前缀解码器）、编码器-解码器架构
  + 模型预训练：
    + 预训练任务：语言建模（LanguageModeling,LM）、去噪自编码（Denoising Autoencoding, DAE）以及混合去噪器（Mixture-of-Denoisers, MoD）
    + 优化参数
+ 指令微调: 使用自然语言形式的数据对预训练后的大语言模型进行参数微调
  + 指令数据的构建: 现有的NLP任务（如翻译）+任务描述、日常对话数据集、合成数据
  + 训练策略：优化器设置（AdamW或Adafactor）、稳定训练技巧（权重衰减和梯度裁剪）和训练技术（3D并行、ZeRO和混合精度训练）都与预训练保持阶段一致
  + 参数高效的模型微调：低秩适配（Low-RankAdaptation,LoRA）微调、适配器微调、前缀微调、提示微调
+ 模型对齐
  + RLHF：依赖人工标注数据训练奖励模型，PPO算法
  + 非强化学习的方法：DPO算法
+ 解码与部署
  + 解码：在自回归架构中，模型针对输入内容（即提示文本）逐个单词生成输出内容的文本
  + 部署：模型量化来减少大模型的显存占用，从而使得能够在资源有限的环境下使用大模型
    + 模型压缩：蒸馏
+ 提示学习：因为大语言模型的微调代价较高，基于自然语言的提示方法已经成为了使用大语言模型解决下游任务的主要途径。
  + 上下文学习
  + 思维链提示：
+ 规划与智能体
+ 评测与应用
