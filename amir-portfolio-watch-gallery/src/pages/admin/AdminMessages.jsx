import {
  MessageSquare,
  Mail,
  Trash2,
  User,
} from "lucide-react";

import GlassCard from "../../components/common/GlassCard";

function AdminMessages() {
  const messages = JSON.parse(
    localStorage.getItem("am-messages") || "[]"
  );

  const deleteMessage = (id) => {
    const confirmed = window.confirm(
      "آیا از حذف این پیام مطمئن هستید؟"
    );

    if (!confirmed) return;

    const updatedMessages =
      messages.filter(
        (message) => message.id !== id
      );

    localStorage.setItem(
      "am-messages",
      JSON.stringify(updatedMessages)
    );

    window.location.reload();
  };

  return (
    <section className="admin-messages-page">

      <div className="admin-products-top">

        <div>
          <span className="admin-eyebrow">
            MESSAGE CENTER
          </span>

          <h1>
            پیام‌های
            <span> دریافتی</span>
          </h1>

          <p>
            پیام‌های ارسال‌شده از صفحه ارتباط با من.
          </p>
        </div>

      </div>


      <div className="admin-products-summary">

        <div>
          <MessageSquare size={19} />

          <span>
            کل پیام‌ها
          </span>

          <strong>
            {messages.length}
          </strong>
        </div>

      </div>


      {messages.length === 0 ? (

        <GlassCard className="admin-orders-empty">

          <MessageSquare size={38} />

          <h3>
            پیام جدیدی وجود ندارد
          </h3>

          <p>
            پیام‌های فرم تماس در این قسمت نمایش داده می‌شوند.
          </p>

        </GlassCard>

      ) : (

        <div className="admin-messages-list">

          {[...messages]
            .reverse()
            .map((message) => (

              <GlassCard
                className="admin-message-card"
                key={message.id}
              >

                <div className="admin-message-top">

                  <div className="admin-message-user">

                    <div className="admin-message-avatar">
                      <User size={18} />
                    </div>

                    <div>

                      <strong>
                        {message.name}
                      </strong>

                      <span>
                        {message.email}
                      </span>

                    </div>

                  </div>


                  <button
                    type="button"
                    className="admin-message-delete"
                    onClick={() =>
                      deleteMessage(message.id)
                    }
                  >
                    <Trash2 size={17} />
                  </button>

                </div>


                <div className="admin-message-body">

                  <p>
                    {message.message}
                  </p>

                </div>


                <div className="admin-message-footer">

                  <span>
                    <Mail size={14} />
                    {message.email}
                  </span>

                  <span>
                    {message.date}
                  </span>

                </div>

              </GlassCard>

            ))}

        </div>

      )}

    </section>
  );
}

export default AdminMessages;